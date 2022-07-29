# parcel-drawing-board

## 개발환경설정

`npm init -y`

`npm i parcel @parcel/transformer-sass`

```json
// package.json
// **--public-url ./** css,js 파일의 상대경로를 찾을 수 있음
{
  "name": "drawing-board",
  "version": "1.0.0",
  "description": "",
  "source": "index.html",
  "scripts": {
    "start": "parcel",
    "build": "parcel build --public-url ./"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@parcel/transformer-sass": "^2.2.1",
    "eslint": "^8.7.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "parcel": "^2.2.1",
		"prettier": "2.7.1"
  }
}
```

`npm run build`

`npm i -D eslint`

`npm i -D --save-exact prettier`

`npm i -D eslint-config-prettier eslint-plugin-prettier`

```json
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "parserOptions": {
    "ecmaVersion": 13,
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error"
  }
}
```

```json
// .prettierrc.json
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
}
```

```
// .eslintignore
// .prettierignore

/dist
/node_modules
```

`cmd+shift+P` ⇒ `settings` ⇒ `Open Workspace Settings(JSON)`

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true 
  }
}
```

> **Font awesome 아이콘**
> 
> 
> [https://fontawesome.com/](https://fontawesome.com/)
> 
> start ⇒ Using A Package Manager ⇒ Install Your Package ⇒  The Free Package 
> 
> `npm install --save @fortawesome/fontawesome-free`
> 

```scss
// src/scss/style.scss
// 경로 추가
$fa-font-path: "../../node_modules/@fortawesome/fontawesome-free/webfonts";
@import "../../node_modules/@fortawesome/fontawesome-free/scss/solid";
@import "../../node_modules/@fortawesome/fontawesome-free/scss/brands";
@import "../../node_modules/@fortawesome/fontawesome-free/scss/fontawesome";
```

## 선그리기 기능

```jsx
// canvas 2d로 구현
initContext() {
    this.context = this.canvasEl.getContext("2d");
}
```

`getBoundingClientRect();`

**`Element.getBoundingClientRect()`**
 메서드는 엘리먼트의 크기와 [뷰포트](https://developer.mozilla.org/ko/docs/Glossary/Viewport)
에 상대적인 위치 정보를 제공하는 `[DOMRect](https://developer.mozilla.org/ko/docs/Web/API/DOMRect)`
 객체를 반환합니다.

반환 값은 padding과 border-width를 포함해 전체 엘리먼트가 들어 있는 가장 작은 사각형인 `[DOMRect](https://developer.mozilla.org/ko/docs/Web/API/DOMRect)`객체입니다. `left`, `top`, `right`, `bottom`
, `x`, `y`, `width`, `height` 프로퍼티는 전반적인 사각형의 위치와 크기를 픽셀 단위로 나타냅니다. `width`와 `height`가 아닌 다른 프로퍼티는 뷰포트의 top-left에 상대적입니다.

```jsx
onMouseDown(event) {
    if (this.MODE === "NONE") return;
    this.IsMouseDown = true;
    const currentPosition = this.getdMousePosition(event);
    this.context.beginPath();
    this.context.moveTo(currentPosition.x, currentPosition.y);
    this.context.lineCap = "round";
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 10;
    this.context.lineTo(400, 400);
    this.context.stroke();
  }

  getMousePosition(event) {
    const boundaries = this.canvasEl.getBoundingClientRect();
    return {
      x: event.clientX - boundaries.left,
      y: event.clientY - boundaries.top,
    };
  }
```

`beginPath()` 경로 시작

`moveTo()` 마우스의 위치

`lineCap` 라인의 끝 모양(둥근지, 각진지…)

`strokeStyle` 라인 색상

`lineWidth` 라인의 두께

`lineTo()` 움직일 좌표

`stroke()` 그리는 명령
