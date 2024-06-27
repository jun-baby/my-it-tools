<script setup lang="ts">
import type { UseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const defaultValue = 'a=1&b=2&c=3';

function urlParamsToJson(urlParams: string): string {
  if (!urlParams.startsWith('http://') && !urlParams.startsWith('https://')) {
    urlParams = `http://www.test.com?${urlParams}`;
  }
  // 创建一个URL对象
  const urlObj = new URL(urlParams);
  // 获取查询字符串参数
  const searchParams = urlObj.searchParams;

  // 创建一个空对象来存储参数
  const params: Record<string, string | string[]> = {};

  // 遍历查询参数并填充对象
  searchParams.forEach((value, key) => {
    // 检查是否已经存在该键
    if (Array.isArray(params[key])) {
      // 如果存在，添加到数组中
      (params[key] as string[]).push(value);
    }
    else {
      // 如果不存在，创建一个数组
      params[key] = value;
    }
  });

  // 将参数对象转换为JSON字符串
  return JSON.stringify(params, null, 2);
}

function urlParamsValidator(urlParams: string): boolean {
  // 创建一个URL对象
  if (!urlParams.startsWith('http://') && !urlParams.startsWith('https://')) {
    urlParams = `http://www.test.com?${urlParams}`;
  }
  try {
    const _ = new URL(urlParams);
    return true;
  }
  catch (error) {
    return false;
  }
}

const transformer = (value: string) => withDefaultOnError(() => urlParamsToJson(value), '');

const rules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => urlParamsValidator(v),
    message: 'Provided url params is not valid.',
  },
];
</script>

<template>
  <format-transformer
    input-label="Your url params"
    :input-default="defaultValue"
    input-placeholder="Paste your url params here..."
    output-label="request of your JSON"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
