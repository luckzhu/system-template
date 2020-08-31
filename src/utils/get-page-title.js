import defaultSettings from '@/settings'

const title = defaultSettings.title || '粤字号”农业产品品牌系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
