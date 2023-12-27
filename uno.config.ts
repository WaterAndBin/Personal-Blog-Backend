import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  shortcuts: {
   "flex-default":'flex justify-center items-center'
  },
  presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
  // ...UnoCSS 选项
});
