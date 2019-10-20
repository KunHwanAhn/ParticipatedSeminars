# WebGPU is coming
- 방진호, zino@chromium.org / GDG Suwon Organizer
- 발표자료 - TBD

# Contents
- Introduce WebGPU
- Backgorund Knowledge
- Investigate WebGL Issues
- How WebGPU Works
-

# Introduce WebGPU
- Next Generation Graphics API on the Web
- Like OpenGL -> Vulkan (New Explicit API)
- Vulkan을 많이 참조했지만, Vulkan의 Spec을 따르지 않음

## Why not a WebVulkan?
- macOS에서 정상적으로 동작하지 않음

## WebGPU History
- Explicit Web Graphics API Presentation in Chronos Group Meeting (2016)
- WebGL Next meeting in Chronos Group(2017.01)
- WebGPU Community Group(2017.02)
- Chrome GPU team sends a intent to implement to blink-dev(2018.06)

# Backgorund Knowledge

## GPU Architecture
- 직렬적인 처리에 집중
- **Each of cores are optimized to execute a steam of serial instructions**
- Large CU for branch prediction, reordering, speculative execution
- Mostly scalar ALUs and registers

## GPU Arichtecture
- 병렬적인 처리에 집중
- Programmable chip
- ALUs share a CU
- **They all perform the same instruction on different data(SIMD)**
- Large memory bandwidth but larger latency
- Fixed functino units for fucntions expensive to run on ALUs (e.g. rasterization)

# What is WebGL?

## WebGL Basic Steps
- Describe surface geometry in triangles
- Tell the GPU how it should manipulate the triangles and color them
- Draw

### Describe Geometry

### Very simplified graphics pipline
- Setup -> Vertex Shader(Programmable) -> Rasterization -> Fragment Shader(Programmable) -> Rendering

### Tell the GPU

### Draw
g1.drawArrays(g1.TRIANGELS, 0, 3);

# Investigate WebGL Issues
- WebGL is inherently slow on the CPU
- WebGL is late, missing "compute" feature
- WebGL doesn't map well to modern GPUs

## Scene Graph in WebGL

```JavaScript
class Node {
  draw(parentTransform) {
    const transform = this.updateTransform(parentTransform);

    for (child of this.children) {
      child.draw(transform);
    }

    this.doDrawCommands(transform);
  }

  doDrawCommands(transform) {
    this.setup3DPipeline();       // Lots of WebGL commands
    this.etupDrawData(transform); // Lots of WebGL commands

    g1.drawArrays(g1.TRIANGELS, 0, this.vertextCount);
  }
}
```

## Can we use WebWorker?
- We could use [OffscreenCanvas](https://tv.naver.com/v/4578450)...But..

## GPU are very good at parallel processing (GPGPU)
- Use them for scientific computing
- In particular for machine learning
- But, WebGL is late, missing "compute" feature

## WebGL 2.0 Compute Extension
- https://www.chronos.org/registry/webgl/specs/latest/2.0-compute/

# How WebGPU Works
- Move factor costs from rendering time to **loading time**
- Create state object in **one call** from description data (Instead of changing global state machine)
- Allow reuse of GPU commands

## Scene Graph in WebGPU

```JavaScript
class Node {
  constructor(device) {
    this.pipeline = device.createRenderPipeline({ ... });
    this.resources = device.createBindGroup({ ... });

    if (this.isDynamic()) return; // Same as before

    const encoder = device.createRenderBundleEncoder({ ... });
    for (child of this.children) {
      child.draw(encoder, tranform);
    }

    this.doDrawCommands(encoder, transform);
    this.bundledCommands = encoder.finish();
  }

  doDrawCommands(encoder, transform) {
    uploadTransform(transform);

    encoder.setPipeline(this.pipeline);
    encoder.setBindGroup(0, this.resources);
    encoder.draw(6, 1, 0 ,0);
  }

  draw(encoder, parentTransform) {
    ...

    if (this.isDynamic()) return; // Same as before

    uploadTransform(transform);
    encoder.executeBundles(this.bundleCommands);

  }
}
```

## CPU Compute 101: Matrix multiplication
1. Initialize WebGPU
2. Allocate memory for the matrix data
3. Create the data "group"
4. GPU Program Source
   4.1. Compile the CPU Program
5. Encode the compute commands
6. Encode the readback commands
7. Submit work to the GPU

> https://github.com/tensorflow/tfjs 이미 WebGPU를 사용하고 있음

> https://webgpu.io
