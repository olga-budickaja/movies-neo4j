<template>
  <div>
    <button
        :class="['btn',
        `btn_${color}`,
        {'btn_rounded': rounded},
        {'btn_outlined': outlined},
        {'btn_large': size === 'large'},
        {'btn_icon': icon}]"
        :disabled="disabled"
        @click="clickOnButton"
    >
      <span v-if="icon"><font-awesome-icon :icon="`fa-solid fa-${icon}`" /></span>
      <span v-else-if="iconButton">
        {{ label }}
        <font-awesome-icon :icon="`fa-regular fa-${iconButton}`" />
      </span>
      <span v-else>{{ label }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class UIButton extends Vue {
  @Prop({ type: String, default: 'Button' }) label?: string;
  @Prop({ type: String, default: 'accent' }) color?: string;
  @Prop({ type: String, default: 'normal' }) size?: string;
  @Prop() disabled?: boolean;
  @Prop() rounded?: boolean;
  @Prop() outlined?: boolean;
  @Prop() icon?: string;
  @Prop() iconButton?: string;

  clickOnButton() {
    this.$emit('click')
  }
}
</script>

<style lang="scss" scoped>
.btn {
  position: relative;
  display: flex;
  width: fit-content;
  flex-direction: row;
  align-items: center;
  padding: 7px 30px;
  gap: 30px;
  border: none;
  border-radius: 7px;
  font-weight: 500;
  text-transform: uppercase;
  transition: all 1.5s ease-out;
  cursor: pointer;
  &_blue {
    background: var(--color-blue);
    border: 1px solid var(--color-blue);
    &:enabled:hover {
      background: var(--color-blue1);
    }
  }
  &_green {
    background: var(--color-green);
    border: 1px solid var(--color-green);
    &:enabled:hover {
      background: var(--color-green1);
    }
  }
  &_red {
    background: var(--color-red);
    border: 1px solid var(--color-red);
    &:enabled:hover {
      background: var(--color-red1);
    }
  }
  &_yellow {
    background: var(--color-yellow);
    border: 1px solid var(--color-yellow);
    &:enabled:hover {
      background: var(--color-yellow1);
    }
  }
  &_orange {
    background: var(--color-orange);
    border: 1px solid var(--color-orange);
    &:enabled:hover {
      background: var(--color-orange1);
    }
  }
  &_accent {
    border: 1px solid var(--color-accent);
    background: linear-gradient(180deg, var(--color-accent3) 0%, var(--color-accent1) 100%), linear-gradient(180deg, var(--color-accent4) 0%, var(--color-accent) 100%);
    box-shadow: 4px 27px 51px rgba(242, 183, 5, 0.35);
    &:enabled:hover {
      background: linear-gradient(-180deg, var(--color-accent3) 30%, var(--color-accent1) 70%), linear-gradient(-180deg, var(--color-accent4) 30%, var(--color-accent) 70%);
      box-shadow: 4px 27px 51px rgba(242, 183, 5, 0.1);
    }
  }
  &_accent2 {
    background: var(--color-accent2);
    border: 1px solid var(--color-accent2);
    &:enabled:hover {
      background: var(--color-accent3);
    }
  }
  &_rounded {
    border-radius: 50px;
  }
  &:disabled {
    opacity: .6;
    cursor: default;
  }
  &_outlined {
    background: transparent;
    box-shadow: none;
    span {
      color: var(--text-color) !important;
    }
    &:hover {
      box-shadow: none;
      span {
        color: #fff !important;
      }
    }
  }
  &_icon {
    padding: 0;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &_large {
    height: 48px;
    padding: 0 38px;
  }
}
</style>