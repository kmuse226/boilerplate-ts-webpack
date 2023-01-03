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

# 에러 핸들링 코드

// fetch('www.example.com').then(console.log); // 에러 발생 코드, fetch catch 하지 않을 시 프로그램 동작에 대해 확인

// try {
// throw new Error('handled error');
// } catch (e) {
// console.log(e); // program goes on
// }
// throw new Error('unhandled error'); // program terminated
