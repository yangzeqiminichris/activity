import { get } from './base'

export async function getKoiIndex (isEnter, longitude, latitude ) {
  const url = `/koiActivity/index`
  return get(url, { isEnter, latitude, longitude })
}

export async function getKoiAwardResult () {
  const url = `/koiActivity/award`
  return get(url)
}
