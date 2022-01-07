import fs from 'fs'

interface GetProps {
  path: string
  type?: 'folder' | 'file'
}

export default ({ path, type }:GetProps) => fs.readdirSync(path, {
  withFileTypes: true
}).reduce((a, c) => {
  switch (type) {
    case 'folder':
      c.isDirectory() && a.push(c.name)
      break
    case 'file':
      c.isFile() && a.push(c.name)
      break
    default:
      a.push(c.name)
  }
  return a
}, [])
