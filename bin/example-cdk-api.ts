#!/usr/bin/env node
import 'source-map-support/register';
import { ExampleCdkApiStack } from '../lib/example-cdk-api-stack';
import { App } from 'aws-cdk-lib';

const app = new App()
new ExampleCdkApiStack(app, 'ExampleCdkApiStack', {
  deployFor: "staging",
  env: {
    account: "085060613484",
    region: "eu-west-2"
  }
})