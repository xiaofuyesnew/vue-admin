import { platform } from 'node:os'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

import Router from '@koa/router'

import { log } from '../utils/index.js'

const router = new Router()

function addMapping(router, mapping) {
  for (const url in mapping) {
    if (url.startsWith('GET ')) {
      const path = url.substring(4)
      router.get(path, mapping[url])
      log(`register URL mapping: GET ${path}`)
    }
    else if (url.startsWith('POST ')) {
      const path = url.substring(5)
      router.post(path, mapping[url])
      log(`register URL mapping: POST ${path}`)
    }
    else if (url.startsWith('PUT ')) {
      const path = url.substring(4)
      router.put(path, mapping[url])
      log(`register URL mapping: PUT ${path}`)
    }
    else if (url.startsWith('DELETE ')) {
      const path = url.substring(7)
      router.delete(path, mapping[url])
      log(`register URL mapping: DELETE ${path}`)
    }
    else {
      log(`invalid URL: ${url}`)
    }
  }
}

function addControllers(router, dir) {
  readdirSync(resolve(cwd(), dir))
    .filter(file => file.endsWith('.js'))
    .forEach(async (file) => {
      log(`Process controller: ${file}...`)
      const mapping = await import(`${platform() === 'win32' ? 'file://' : ''}${cwd()}/${dir}/${file}`)
      addMapping(router, mapping.default)
    })
}

export default function controller(dir) {
  const modules = dir || 'src/controller/modules'
  addControllers(router, modules)
  return router.routes()
}
