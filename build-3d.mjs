// Builds what the 3D Woodie on the homepage loads. Run it after changing assets/js/woodie-viewer.js or either model:
//
//   npm i --no-save esbuild @gltf-transform/core @gltf-transform/extensions @gltf-transform/functions meshoptimizer sharp
//   node build-3d.mjs            the viewer only
//   node build-3d.mjs models     the viewer and the two models
//
// The viewer: assets/js/woodie-viewer.js and the parts of three.js it uses (from the copy in assets/js/three) become one
// file, assets/js/woodie-viewer.min.js, which is the file index.html loads. One request in place of four, and about a
// fifth smaller once compressed.
//
// The models, rewritten in place, with nothing drawn differently:
//   woodie-1188.glb  vertex data in fewer bits (KHR_mesh_quantization, which three.js reads without a decoder),
//                    duplicates and unused data dropped, textures kept as lossless WebP in place of PNG.
//   woodie-idle.glb  only its animation is used, so its meshes, skins, materials and textures go, and the
//                    animation's keys are thinned where they lie on a straight line.
import { build } from 'esbuild';

await build({
  entryPoints: ['assets/js/woodie-viewer.js'],
  outfile: 'assets/js/woodie-viewer.min.js',
  bundle: true, format: 'esm', minify: true, target: 'es2019', legalComments: 'none',
  alias: { three: './assets/js/three/three.module.min.js' },
  banner: { js: '/* woodie-viewer.js with three.js r162 (MIT, see assets/js/three/LICENSE). Built by build-3d.mjs. */' }
});

if (process.argv[2] === 'models') {
  const { NodeIO } = await import('@gltf-transform/core');
  const { ALL_EXTENSIONS } = await import('@gltf-transform/extensions');
  const { dedup, prune, quantize, resample, reorder, textureCompress } = await import('@gltf-transform/functions');
  const { MeshoptEncoder } = await import('meshoptimizer');
  const sharp = (await import('sharp')).default;
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
  await MeshoptEncoder.ready;

  const model = await io.read('assets/models/woodie-1188.glb');
  await model.transform(
    dedup(), prune({ keepLeaves: true, keepAttributes: true }), reorder({ encoder: MeshoptEncoder }),
    quantize({ quantizePosition: 14, quantizeNormal: 10, quantizeTexcoord: 12, quantizeWeight: 8 }),
    textureCompress({ encoder: sharp, targetFormat: 'webp', lossless: true, effort: 100 }));
  await io.write('assets/models/woodie-1188.glb', model);

  const idle = await io.read('assets/models/woodie-idle.glb');
  for (const node of idle.getRoot().listNodes()) { node.setMesh(null); node.setSkin(null); }
  await idle.transform(prune({ keepLeaves: true }), resample({ tolerance: 0.0001 }), dedup());
  await io.write('assets/models/woodie-idle.glb', idle);
}
