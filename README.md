# ESLINT 설정 순서

1. yarn add -D eslint
2. npx eslint --init
3. npx eslint ./src

# Prettier 설정 순서

1. yarn add -D prettier
2. .prettierrc.js 생성
3. npx prettier --check .src OR npx prettier --write ./src

# Editor Ruler

1. setting.json
2. editor.rulers: [80]
3. prettier printWidth: 80,

# Formatter (default)

1. prettier extension 설치
2. setting > format on Save true
