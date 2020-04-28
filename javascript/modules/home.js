
require.config({
  // baseUrl:"./js",
  paths: {
    "jquery": '../lib/jquery.min',
    'swiper':'../lib/swiper.min'
  }
});
define([
  'jquery','swiper'
], function ($,Swiper) {
  'use strict';
  // console.log($)
  console.log($.ajax())
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: true,//可选选项，自动滑动
  })
});
