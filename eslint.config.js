import antfu from '@antfu/eslint-config'

export default antfu(
  {
    files: ['packages/admin/**/*.{js,vue}'],
    unocss: true,
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: ['packages/server/**/*.js'],
    rules: {
      'no-console': 'off',
    },
  },
)
