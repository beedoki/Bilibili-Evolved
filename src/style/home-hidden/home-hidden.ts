type HomeHiddenOption = Readonly<{
  name: string
  displayName: string
  style?: string
}>
const isHome = () => {
  if (document.URL === 'https://www.bilibili.com/') {
    return !settings.simplifyHome
  }
  return document.URL.includes('https://www.bilibili.com/')
}
const homeHiddenOptions: HomeHiddenOption[] = [
  {
    name: 'categories', displayName: '分区栏', style: `
      .bili-header-m>.bili-wrapper {
        visibility: hidden !important;
        height: 18px !important;
      }
      .primary-menu-itnl {
        visibility: hidden !important;
        height: 24px !important;
        padding: 0 !important;
      }
      .bili-header__channel {
        height: 12px !important;
      }
      .bili-header__channel > * {
        display: none !important;
      }
    `,
  },
  {
    name: 'trends', displayName: '活动/热门视频', style: `
      .first-screen #reportFirst1 { display: none !important; }
      .first-screen .space-between {
        margin-bottom: 0 !important;
      }
      .bili-layout .bili-grid:first-child,
      .rcmd-box-wrap {
        display: none !important;
      }
    `,
  },
  {
    name: 'online', displayName: '在线列表(旧版)', style: `
      .first-screen #reportFirst2 { display: none !important; }
    `,
  },
  {
    name: 'ext-box', displayName: '赛事(旧版)', style: `
      .first-screen #reportFirst3 { display: none !important; } `,
  },
  {
    name: 'special', displayName: '特别推荐(旧版)', style: `
      #bili_report_spe_rec { display: none !important; }
    `,
  },
  {
    name: 'contact', displayName: '联系方式', style: `
      .bili-footer .b-footer-wrap,
      .international-footer {
        display: none !important;
      }
    `,
  },
  {
    name: 'elevator', displayName: '右侧分区导航(旧版)', style: `
      .storey-box .elevator { display: none !important; }
    `,
  },
]
const syncState = (item: HomeHiddenOption) => {
  if (!settings.homeHiddenItems.includes(item.name)) {
    if (item.style) {
      dq(`#home-hidden-style-${item.name}`)?.remove()
    } else {
      document.body.classList.remove(`home-hidden-${item.name}`)
    }
  } else {
    if (item.style) {
      resources.applyImportantStyleFromText(item.style, `home-hidden-style-${item.name}`)
    } else {
      document.body.classList.add(`home-hidden-${item.name}`)
    }
  }
}
;(async () => {
  if (!isHome()) {
    return
  }
  const homeOptions: Promise<HomeHiddenOption[]> = (async () => {
    const isNewHome = getCookieValue('i-wanna-go-back') === '-1'
    const isNotHome = document.URL !== 'https://www.bilibili.com/'
    if (!isNewHome) {
      const list = await SpinQuery.condition(
        () => dqa('.proxy-box > div'),
        elements => elements.length > 0 || isNotHome,
      )
      return list?.map(it => ({
        name: it.id.replace(/^bili_/, ''),
        displayName: it.querySelector('header .name')?.textContent?.trim() ?? '未知分区',
      })) ?? []
    } else {
      const skipIds = ['推广']
      const headers = await SpinQuery.condition(
        () => dqa('.bili-grid .the-world'),
        elements => elements.length > 3 || isNotHome,
      )
      console.log(headers)
      const getContainer = (header: Element) => {
        let currentElement = header
        while (currentElement.parentElement) {
          if (currentElement.classList.contains('bili-grid')) {
            return currentElement
          }
          currentElement = currentElement.parentElement
        }
        return null
      }
      return headers
        ?.filter(element => !skipIds.includes(element.id))
        .map(element => {
          const container = getContainer(element) as HTMLElement
          const name = element.id
          if (container) {
            container.dataset.area = name
            return {
              name,
              displayName: name,
            }
          }
          return null
        })
        .filter((it): it is HomeHiddenOption => it !== null) ?? []
    }
  })()
  const generatedOptions = await homeOptions
  homeHiddenOptions.push(...generatedOptions)
  homeHiddenOptions.forEach(syncState)
  const generatedStyles = generatedOptions.map(({ name }) => {
    return `
body.home-hidden-${name} .bili-layout .bili-grid[data-area="${name}"],
body.home-hidden-${name} .storey-box .proxy-box #bili_${name} {
  display: none !important;
}
`.trim()
  }).join('\n')
  const fixedStyles: string = resources.import('homeHiddenStyle')
  resources.applyImportantStyleFromText(generatedStyles + fixedStyles, 'home-hidden-style')
})()

export default {
  widget: {
    condition: isHome,
    content: /*html*/`
      <div class="gui-settings-flat-button" style="position: relative" id="home-hidden">
        <i class="mdi mdi-24px mdi-settings"></i>
        <span>首页过滤</span>
        <div class="home-hidden-settings popup">
          <div v-for="item in items" @click="toggle(item)" :key="item.name" class="home-hidden-settings-item" :class="{ 'home-hidden': hiddenItems.includes(item.name) }">
            <i class="mdi mdi-18px mdi-eye"></i>
            <i class="mdi mdi-18px mdi-eye-off"></i>
            {{ item.displayName }}
          </div>
        </div>
      </div>
    `,
    success: async () => {
      const homeHiddenButton = dq('#home-hidden') as HTMLElement
      new Vue({
        el: dq(homeHiddenButton, '.popup') as HTMLElement,
        data() {
          return {
            items: homeHiddenOptions,
            hiddenItems: [...settings.homeHiddenItems],
          }
        },
        watch: {
          hiddenItems(newValue: string[]) {
            settings.homeHiddenItems = [...newValue]
          }
        },
        mounted() {
          const popup = this.$el
          homeHiddenButton.addEventListener('click', e => {
            if (e.target === popup || popup.contains(e.target as HTMLElement)) {
              return
            }
            popup.classList.toggle('opened')
          })
        },
        methods: {
          async toggle(item: HomeHiddenOption) {
            const hidden = this.hiddenItems as string[]
            const index = hidden.indexOf(item.name)
            if (index !== -1) {
              hidden.splice(index, 1)
            } else {
              hidden.push(item.name)
            }
            await this.$nextTick()
            syncState(item)
          },
        }
      })
    },
  }
}
