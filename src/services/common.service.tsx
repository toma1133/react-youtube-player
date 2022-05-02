export const escapeRegExp = (target: string): string =>
  target.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')

interface IMusicInfo {
  artist?: string
  title?: string
  credits?: string[]
}

export const parseTitleString = (target?: string): IMusicInfo => {
  const baddies: string[] = [
    '[dubstep]',
    '[electro]',
    '[edm]',
    '[house music]',
    '[glitch hop]',
    '[video]',
    '[official video]',
    '(official video)',
    '(official music video)',
    '(lyrics)',
    '[ official video ]',
    '[official music video]',
    '[free download]',
    '[free dl]',
    '( 1080p )',
    '(with lyrics)',
    '(high res / official video)',
    '(music video)',
    '[music video]',
    '[hd]',
    '(hd)',
    '[hq]',
    '(hq)',
    '(original mix)',
    '[original mix]',
    '[lyrics]',
    '[free]',
    '[trap]',
    '[monstercat release]',
    '[monstercat freebie]',
    '[monstercat]',
    '[edm.com premeire]',
    '[edm.com exclusive]',
    '[enm release]',
    '[free download!]',
    '[monstercat free release]',
    '(Official Music Video﻿)',
    'Official Music Video',
    '電影主題曲',
    '電視劇',
    '/《(.*)》',
  ]
  let artist: string,
    title: string,
    credits: string[] = []
  let targetStr = target || ''

  baddies.forEach((token) => {
    targetStr = targetStr.replace(token + ' - ', '').trim()
    targetStr = targetStr.replace(token.toUpperCase() + ' - ', '').trim()
    targetStr = targetStr.replace(token.toLowerCase() + ' - ', '').trim()
    targetStr = targetStr.replace(token, '').trim()
    targetStr = targetStr.replace(token.toUpperCase(), '').trim()
    targetStr = targetStr.replace(token.toLowerCase(), '').trim()
  })

  const parts = targetStr.split(' - ')

  for (let i = 0; i < parts.length; i++) {
    if (baddies.indexOf(parts[i].toLowerCase()) >= 0) {
      parts.splice(i, 1)
    }
  }

  if (parts.length === 2) {
    artist = parts[0]
    title = parts[1]
  } else if (parts.length > 2) {
    artist = parts[0]
    title = parts[1]
  } else {
    artist = parts[0]
    title = parts[0]
  }

  baddies.forEach(function (baddy) {
    title = title.replace(new RegExp(escapeRegExp(baddy), 'i'), '').trim()
    artist = artist.replace(new RegExp(escapeRegExp(baddy), 'i'), '').trim()
  })

  credits.push(title.replace(/(.*)\((.*) remix\)/i, '$2').trim())
  credits.push(title.replace(/(.*) ft\.? (.*)/i, '$1').trim())
  credits.push(title.replace(/(.*) ft\.? (.*)/i, '$2').trim())
  credits.push(title.replace(/(.*) feat\.? (.*)/i, '$1').trim())
  credits.push(title.replace(/(.*) feat\.? (.*)/i, '$2').trim())
  credits.push(title.replace(/(.*) featuring (.*)/i, '$2').trim())
  credits.push(title.replace(/(.*) \(ft (.*)\)/i, '$1').trim())
  credits.push(title.replace(/(.*) \(ft (.*)\)/i, '$2').trim())
  credits.push(title.replace(/(.*) \(feat\.? (.*)\)/i, '$2').trim())
  credits.push(title.replace(/(.*) \(featuring (.*)\)/i, '$2').trim())
  credits.push(artist.replace(/(.*) ft\.? (.*)/i, '$1').trim())
  credits.push(artist.replace(/(.*) ft\.? (.*)/i, '$2').trim())
  credits.push(artist.replace(/(.*) feat\.? (.*)/i, '$1').trim())
  credits.push(artist.replace(/(.*) feat\.? (.*)/i, '$2').trim())
  credits.push(artist.replace(/(.*) featuring (.*)/i, '$2').trim())
  credits.push(artist.replace(/(.*) \(ft (.*)\)/i, '$1').trim())
  credits.push(artist.replace(/(.*) \(ft (.*)\)/i, '$2').trim())
  credits.push(artist.replace(/(.*) \(feat\.? (.*)\)/i, '$1').trim())
  credits.push(artist.replace(/(.*) \(featuring (.*)\)/i, '$2').trim())
  credits.push(artist.replace(/(.*) & (.*)/gi, '$1').trim())
  credits.push(artist.replace(/(.*) & (.*)/gi, '$2').trim())
  credits.push(artist.replace(/(.*) vs\.? (.*)/i, '$1').trim())
  credits.push(artist.replace(/(.*) vs\.? (.*)/i, '$2').trim())
  credits.push(artist.replace(/(.*) x (.*)/i, '$1').trim())
  credits.push(artist.replace(/(.*) x (.*)/i, '$2').trim())

  let creditMap: { [key: string]: string } = {}
  credits.forEach(function (credit) {
    if (credit !== title) {
      creditMap[credit] = credit
    }
  })

  return {
    artist: artist,
    title: title,
    credits: Object.keys(creditMap),
  }
}
