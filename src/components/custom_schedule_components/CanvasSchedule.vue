<template>
  <div class="canvas-container">
    <canvas ref="canvas" height="900" width="1600"></canvas>
    <div class="toolbar"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CanvasSchedule',
  data () {
    return {
      canvas: HTMLCanvasElement.prototype
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas as HTMLCanvasElement
    this.drawRoundRect(10, 10, 266, 112, 20, 'grey')
  },
  methods: {
    roundRect (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number|object = 0
    ) {
      let _radius = { tl: 0, tr: 0, br: 0, bl: 0 }

      if (typeof radius === 'number') {
        _radius = { tl: radius, tr: radius, br: radius, bl: radius }
      } else {
        _radius = { ...{ tl: 0, tr: 0, br: 0, bl: 0 }, ...radius }
      }
      ctx.moveTo(x + _radius.tl, y)
      ctx.lineTo(x + width - _radius.tr, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + _radius.tr)
      ctx.lineTo(x + width, y + height - _radius.br)
      ctx.quadraticCurveTo(x + width, y + height, x + width - _radius.br, y + height)
      ctx.lineTo(x + _radius.bl, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - _radius.bl)
      ctx.lineTo(x, y + _radius.tl)
      ctx.quadraticCurveTo(x, y, x + _radius.tl, y)
    },
    drawRoundRect (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
      color: string
    ) {
      const ctx = this.canvas?.getContext('2d')
      if (ctx != undefined) {
        ctx.lineWidth = 1
        ctx.beginPath()
        this.roundRect(ctx, x, y, width, height, radius)
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.stroke()
        ctx.fill()
        ctx.closePath()
      }
    }
  }
})
</script>

<style scoped>
.canvas-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

canvas {
  width: 100%;
  aspect-ratio: 16/9;
  background-color: whitesmoke;
  border-radius: 1.2rem;
}
</style>
