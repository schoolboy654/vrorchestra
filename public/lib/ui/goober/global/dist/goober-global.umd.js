!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports,require("goober")):"function"==typeof define&&define.amd?define(["exports","goober"],o):o((e=e||self).gooberGlobal={},e.goober)}(this,function(e,o){let n=o.css.bind({g:1});e.createGlobalStyles=function(){const e=o.styled.call({g:1},"div").apply(null,arguments);return function(o){return e(o),null}},e.glob=n});