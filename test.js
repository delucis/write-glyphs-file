import path from 'path'
import fs from 'fs'
import test from 'ava'
import tempfile from 'tempfile'
import writeGlyphs from '.'

test('async', async t => {
  const tmp = path.join(tempfile(), 'foo.glyphs')
  await writeGlyphs(tmp, {foo: true})
  t.is(fs.readFileSync(tmp, 'utf8'), '{\nfoo = true;\n}\n')
})

test('sync', t => {
  const tmp = path.join(tempfile(), 'foo.glyphs')
  writeGlyphs.sync(tmp, {foo: true}, {detectIndent: true, indent: 2})
  t.is(fs.readFileSync(tmp, 'utf8'), '{\nfoo = true;\n}\n')
})

test('write arrays', async t => {
  const tmp = path.join(tempfile(), 'foo.glyphs')
  await writeGlyphs(tmp, {foo: [1, 5]})
  t.is(fs.readFileSync(tmp, 'utf8'), '{\nfoo = (\n1,\n5\n);\n}\n')
})

test('write objects', async t => {
  const tmp = path.join(tempfile(), 'foo.glyphs')
  await writeGlyphs(tmp, {foo: {}, bar: {baz: []}})
  t.is(fs.readFileSync(tmp, 'utf8'), '{\nfoo = {\n};\nbar = {\nbaz = (\n\n);\n};\n}\n')
})
