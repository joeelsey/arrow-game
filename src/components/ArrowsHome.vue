<template>
  <div>ARROWS</div>
  <div>timer: {{ state.timer }}</div>
  <div>wins: {{ state.wins }}</div>
  <div>fails: {{ state.fails }}</div>
  <v-btn v-on:click="stopGameIntervalTimer()">STOP TIMER</v-btn>
  <v-btn v-on:click="startGameIntervalTimer()">START TIMER</v-btn>
  <div>
    <span v-for="(arrow, index) in state.arrows" :key="`${arrow}_${index}`"
      ><div class="arrow-container">
        <component :is="arrowsEnum[arrow]" class="arrow-component"></component></div
    ></span>
  </div>
</template>
<script>
import { reactive, onMounted, onUnmounted, watch } from 'vue'
import { createListOfRandomArrows } from '@/utils'
import LeftArrow from '@/components/LeftArrow.vue'
import RightArrow from '@/components/RightArrow.vue'
import UpArrow from '@/components/UpArrow.vue'
import DownArrow from '@/components/DownArrow.vue'

// change color of arrow when correct guess.
// change color of arrow when incorrect guess.

export default {
  setup() {
    const state = reactive({
      arrows: createListOfRandomArrows(0),
      arrowIndex: 0,
      correctArrowIndex: null,
      wins: 0,
      currentKey: null,
      timer: 30,
      fails: 0, // 3 fails ends game
      intervalTimer: null
    })

    const arrowIcons = {
      LeftArrow,
      RightArrow,
      UpArrow,
      DownArrow
    }

    const arrowsEnum = {
      '&#8592;': arrowIcons.LeftArrow,
      '&#8594;': arrowIcons.RightArrow,
      '&#8593;': arrowIcons.UpArrow,
      '&#8595;': arrowIcons.DownArrow
    }

    const keyEventMap = {
      ArrowUp: '&#8593;',
      ArrowDown: '&#8595;',
      ArrowLeft: '&#8592;',
      ArrowRight: '&#8594;'
    }

    const resetArrows = () => {
      state.arrowIndex = 0
      state.arrows = createListOfRandomArrows(state.wins)
    }

    const handleWinEvent = () => {
      state.wins++
      state.timer = 30
      resetArrows()
    }

    const handleFailEvent = () => {
      state.fails++
      state.timer = 30
      resetArrows()
    }

    const handleKeyDownEvent = (e) => {
      state.currentKey = keyEventMap[e.key]
      if (state.timer > 0) {
        if (state.arrowIndex < state.arrows.length - 1) {
          if (state.arrows[state.arrowIndex] === state.currentKey) {
            state.arrowIndex += 1
          } else {
            handleFailEvent()
          }
        } else {
          handleWinEvent()
        }
      }
    }

    const startGameIntervalTimer = () => {
      state.intervalTimer = setInterval(() => {
        state.timer--
      }, 1000)
    }

    const stopGameIntervalTimer = () => {
      if (state.intervalTimer != null) {
        clearInterval(state.intervalTimer)
      }
    }

    watch(state, (newValue) => {
      if (newValue.timer === 0) {
        stopGameIntervalTimer()
        state.fails++
        resetArrows()
        state.timer = 30
        startGameIntervalTimer()
      }
    })

    onMounted(() => {
      document.addEventListener('keydown', function (e) {
        handleKeyDownEvent(e)
      })

      startGameIntervalTimer()
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', function () {
        console.info('event listener removed')
      })
      stopGameIntervalTimer()
    })

    return { state, arrowsEnum, stopGameIntervalTimer, startGameIntervalTimer }
  }
}
</script>
<style lang="scss" scoped>
.arrow-container {
  display: inline-block;
  margin-left: 10px;
}
.arrow-component {
  color: white;
}
</style>
