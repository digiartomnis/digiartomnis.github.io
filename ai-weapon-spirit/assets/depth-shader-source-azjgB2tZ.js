function e(e,t){if(!e)return t;let n=t.replace(/\btexture_depth_2d\b/,`texture_depth_multisampled_2d`);if(n===t)throw Error(`[presentation-settings] depth texture declaration is missing`);let r=/fn sceneDepth\([^}]*\}/;if(!r.test(n))throw Error(`[presentation-settings] sceneDepth helper is missing`);n=n.replace(r,`fn sceneDepth(pixel: vec2<i32>) -> f32 {
    let samples = textureNumSamples(depthTexture);
    var sum = 0.0;
    for (var i = 0u; i < samples; i += 1u) { sum += textureLoad(depthTexture, pixel, i32(i)); }
    return sum / f32(samples);
  }`);let i=/fn outlineDepth\([^}]*\}/;if(!i.test(n))throw Error(`[presentation-settings] outlineDepth helper is missing`);return n=n.replace(i,`fn outlineDepth(pixel: vec2<i32>) -> f32 {
    let samples = textureNumSamples(depthTexture);
    var nearest = 0.0;
    for (var i = 0u; i < samples; i += 1u) { nearest = max(nearest, textureLoad(depthTexture, pixel, i32(i))); }
    return nearest;
  }`),n}export{e as t};