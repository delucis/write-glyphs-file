import path from 'path'
import fs from 'fs'
import test from 'ava'
import tempfile from 'tempfile'
import writeGlyphs from '.'

test('async', async t => {
  const tmp = path.join(tempfile(), 'foo.glyphs')
  const data = { familyName: 'My Font' }
  await writeGlyphs(tmp, data)
  t.is(fs.readFileSync(tmp, 'utf8'), '{\nfamilyName = "My Font";\n}\n')
})

test('sync', t => {
  const tmp = path.join(tempfile(), 'foo.glyphs')
  const data = { familyName: 'My Font' }
  writeGlyphs.sync(tmp, data)
  t.is(fs.readFileSync(tmp, 'utf8'), '{\nfamilyName = "My Font";\n}\n')
})

test('write arrays', async t => {
  const tmp = path.join(tempfile(), 'foo.glyphs')
  const data = { DisplayStrings: [ 'handgloves', '9' ] }
  await writeGlyphs(tmp, data)
  t.is(fs.readFileSync(tmp, 'utf8'), '{\nDisplayStrings = (\nhandgloves,\n9\n);\n}\n')
})

test('write objects', async t => {
  const tmp = path.join(tempfile(), 'foo.glyphs')
  const data = {
    kerning: {
      'F9005791-A': {
        T: { '@MMK_R_A': '-30' }
      }
    }
  }
  await writeGlyphs(tmp, data)
  t.is(fs.readFileSync(tmp, 'utf8'), '{\nkerning = {\n"F9005791-A" = {\nT = {\n"@MMK_R_A" = "-30";\n};\n};\n};\n}\n')
})
