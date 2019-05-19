<template>
    <span>
        <span class="circle-button"
              :style="value <= 0 ? 'background: lightgrey' : ''"
              @click.stop="value > 0 ? $emit('input', value - 1) : null">-</span>
        <span style="font-size: 15px; margin: 0 7px;">{{ value }}</span>
        <span class="circle-button"
              :style="value >= maxCount ? 'background: lightgrey' : ''"
              @click.stop="value < maxCount ? $emit('input', value + 1) : null">+</span>
    </span>
</template>

<script>
    export default {
        props: {
            value: {
                type: Number,
                default: 0
            },
            maxCount: {
                type: Number,
                default: 1
            }
        }
    }
</script>

<style>
    .circle-button {
        color: white;
        background: orange;
        display: inline-block;
        width: 18px;
        height: 18px;
        border-radius: 9px;
        font-size: 16px;
        line-height: 16px;
        text-align: center;
    }
</style>