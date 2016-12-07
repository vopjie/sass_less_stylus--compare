# sass_less_stylus--compare

# CSS预处理器

### 为什么 less 更流行？
- less语法比保持和css一样
- Less中文网
- Bootstrap使用并推荐Less
- Less提供不用预先编译的浏览器端用法

### 简单介绍下 stylus [ˈstaɪləs]
> 来自于Node.js社区，主要用来给Node项目进行CSS预处理支持
，Stylus官网：http://learnboost.github.com/stylus

- 主要特色：用缩进代替冒号（:）分号（;）大括号（{}）作为分隔符来区分代码块；
- 缺点：难以阅读
- 现状：人气较低

``` stylus
// stylus
font-size = 14px
body
  font font-size Arial, sans-seri
#logo
  position: absolute
  top: 50%
  left: 50%
  width: w = 150px
  height: h = 80px
  margin-left: -(w / 2)
  margin-top: -(h / 2)
```

### 对比 less 与 scss
> Sass有两套语法规则：一个是和stylus类似，用缩进作为分隔符来区分代码块的；另一套规则和CSS一样采用了大括号（｛｝）作为分隔符，命名为SCSS。

- #### 变量

``` Less
// Less
@color-green: #4D926F;

#header {
  color: @color-green;
}

```

``` scss
// Sass
$color-green: #4D926F;

#header {
 color: $color-green;
}

```

- #### 混合（mixin）
> 带参数的代码片段

``` less
// Less
// 设置文本溢出显示省略号...
.setNowrap(@width:98%) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: @width;
  display:inline-block;
}
.eg {
  .setNowrap();
}
```

``` scss
// Sass
// 设置文本溢出显示省略号...
@mixin setNowrap($width:98%) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: $width;
  display:inline-block;
}
.eg {
  @include setNowrap();
}
```

- #### 嵌套规则

``` less
// Less
#header {
  h1 {
    font-size: 26px;
    // & 符号表示引用父级
    &.active {
      color: red;
    }
  }
  p { font-size: 12px;
    a { text-decoration: none;
      &:hover { border-width: 1px; }
    }
  }
}
```

``` scss
// Sass
// Less 不支持这种嵌套
.eg {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}

// @at-root 的内联选择器模式，将不会让你的选择器发生任何的嵌套，直接移除了父选择，避免嵌套过深
// Less 不支持@at-root
.foo {
  @at-root .bar {
    color:gray;
  }
}
.bar {
  color: gray;
}
```

- #### 注释

``` less
// Less & Sass
// less和sass都支持单双斜杠两种注释,但是双斜线的注释在编译成 CSS 的时候会自动过滤掉

/* Hello, I'm a CSS-style comment */
.class { color: black }

// Hi, I'm a silent comment, I won't show up in your CSS
.class { color: white }
```

- #### 函数 & 运算符
> 运算提供了加，减，乘，除以及属性值和颜色的运算

``` less
// Less
// Color 函数
lighten(@color, 10%);     // return a color which is 10% *lighter* than @color
darken(@color, 10%);      // return a color which is 10% *darker* than @color
...
// Math 函数
round(1.67); // returns `2`
ceil(2.4);   // returns `3`
floor(2.6);  // returns `2`
// percentage 函数
percentage(0.5); // returns `50%`

@the-border: 1px;
@base-color: #111;
@red:        #842210;
#header {
  color: @base-color * 3;
  border-left: @the-border;
  border-right: @the-border * 2;
}
#footer {
  color: @base-color + #003300;
  border-color: desaturate(@red, 10%); // Color 函数之一：降低10%颜色饱和度
}
// less自定义函数
// 需要使用插件（非官方插件）：less-plugin-functions才支持自定义函数

```
``` sass
// sass
// sass 运算符和less类似，只是函数命名会有不同，结合compass，提供了更多的函数运算符
// sass的自定义函数示例：见 /sass/function/

```

- #### 作用域

``` less
// Less
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}

#footer {
  color: @var; // red  
}
```
``` sass
// sass
// sass和less在作用域上用法一样
```

- #### Importing

``` less
// Less
@import "lib.less";
@import "lib";

// 如果你想导入一个CSS文件而且不想LESS对它进行处理，只需要使用.css后缀就可以:
@import "lib.css";
```
``` sass
// sass
// sass和less在Importing上用法一样
```

- #### 字符串插值

``` less
// Less
@base-url: "http://assets.fnord.com";
.eg {
  background-image: url("@{base-url}/images/bg.png");
}
```
``` sass
// sass
$base-url: "http://assets.fnord.com";
.eg {
  background-image: url("#{base-url}/images/bg.png");
}
```

- #### 避免编译

``` less
// Less
// 有时候我们需要输出一些不正确的CSS语法或者使用一些 LESS不认识的专有语法.
// 使用 ~
.setRgba(@r:0,@g:0,@b:0,@a:0.8) {
  @color-rgba : rgba(@r,@g,@b,@a);
  @AA :alpha(@color-rgba);
  @RR : red(@color-rgba);
  @GG : green(@color-rgba);
  @BB : blue(@color-rgba);
  background-color: @color-rgba;
  @argb : argb(@color-rgba);
  filter: ~"progid:DXImageTransform.Microsoft.gradient(startcolorstr=@{argb},endcolorstr=@{argb})";
}
.eg {
  .setRgba();
}
```
``` sass
// sass
// sass 不需要用~处理
@mixin setRgba($name,$r:0,$g:0,$b:0,$a:.8) {
  $color-rgba : rgba($r,$g,$b,$a);
  $color-rgb : rgb($r,$g,$b);
  $AA :alpha($color-rgba);
  $RR : red($color-rgba);
  $GG : green($color-rgba);
  $BB : blue($color-rgba);
  #{$name}:$color-rgba;
  filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr='#{ie-hex-str($color-rgba)}',endcolorstr='#{ie-hex-str($color-rgba)}');
}
```

- #### JavaScript 表达式

``` less
// Less
// JavaScript 表达式也可以在.less 文件中使用. 可以通过反引号的方式使用:
// 也可以访问JavaScript环境:
@height: `document.body.clientHeight`;
```
``` sass
// sass
// sass 不支持JavaScript 表达式
```

- #### 继承

``` less
// Less
.parentClass{  
  color:red;  
}  
.subClassOne{  
  &:extend(.parentClass);  
}
// or  
.parentClass{  
  span{  
    color:red  
  }  
}  
.subClassOne{  
  &:extend(.parentClass span);  
}
```

``` sass
// sass
// sass 占位符与继承
// 公用的.message也会被编译
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}

// 公用的%icon不会被编译
%icon {
  transition: background-color ease .2s;
  margin: 0 .5em;
}

.error-icon {
  @extend %icon;
}
.info-icon {
  @extend %icon;
}
```

- #### 命名空间
> 定义一些属性集之后可以重复使用

``` less
// Less
#bundle {
  .button () {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover { background-color: white }
  }
  .tab { ... }
  .citation { ... }
}

#header a {
  color: orange;
  #bundle > .button;
}
```
``` sass
// sass
// sass 没有命名空间一说
```

- #### if/else
> 为了尽可能地保留CSS的可声明性，LESS通过导引混合而非if/else语句来实现条件判断，因为前者已在@media query特性中被定义。

``` less
// Less
.myMixin (@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.myMixin (@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.myMixin (@a) {
  color: @a;
}
// 使用 1
.class1 { .myMixin(#ddd) }
.class2 { .myMixin(#555) }
// 使用 2
// 见 /less/mixin/setAnimation.less

```
``` sass
// sass
@mixin myMixin($a) {
  @if lightness($a) >= 50% {
    background-color: black;
  } @else {
    background-color: white;
  }
}
```

- #### for

``` less
// Less
.for(@i) when (@i <11){
  @name:(@i*5);
  .mt@{name} {margin-top: @i * 5px;}
  .pt@{name} {padding-top: @i * 5px;}
  .for((@i+1))
}
.for(1);
```
``` sass
// sass
// 循环生成若干 margin, padding 通用类名 方面html内调用
//
@for $i from 1 through 10 {
  .mt#{$i * 5} {margin-top: $i * 5px;}
  .pt#{$i * 5} {padding-top: $i * 5px;}
}
// or
$i: 50;
@while $i >= 0 {
  .mt#{$i} {margin-top: $i * 1px;}
  .pt#{$i} {padding-top: $i * 1px;}
  $i: $i - 5;
}
```

### sass 的其他优点
// sass 的使用依赖于ruby,示例是结合了gulp

1，下载安装nodejs

2，命令行安装ruby:

window:
先下载安装
https://rubyinstaller.org/
``` bash
gem install ruby
```

mac:
参考链接：http://www.cnblogs.com/daguo/p/4097263.html
``` bash
$ curl -L https://get.rvm.io | bash -s stable

$ source ~/.rvm/scripts/rvm

$ rvm -v

$ rvm list known

$ rvm install 2.3

// 如果在这一步遇到下面的报错，试试通过终端重新安装的Xcode命令行工具
// xcrun: error: invalid active developer path
// $ xcode-select --install

$ rvm list

$ rvm 2.3 --default

$ ruby -v

$ gem -v

2，命令行安装ruby:
$ gem install ruby

3，命令行安装compass
$ gem install compass

```

3，命令行安装compass
``` bash
gem install compass
```

3，如需引用normalize请安装normalize.css
命令行安装compass-normalize
``` bash
gem install compass-normalize
```

4，安装插件
``` bash
npm i
```

5，运行开启gulp自动化
``` bash
gulp
```

// 这里说一下其中一个很重要的点：精灵图合成

// 结合compass,自动将一个文件夹中的所有icon合成精灵图,见示例

### bootstrap 与 less
### 扩展：css后处理器
### 扩展：iconfont
