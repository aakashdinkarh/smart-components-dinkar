# Conditional Rendering is one of the most used concepts while writing a component.

Sometimes rendering logic for the components become complex and we end up writing something which is not readable, also it can cause several unintended bugs.

So to handle that situation we case Switch case as ->

```javascript
<Switch>
  <Switch.Case condition={false}>Case 1</Switch.Case>
  <Switch.Case condition>Case 2</Switch.Case>
  <Switch.Case condition={false}>Case 3</Switch.Case>
  <Switch.Default>Default</Switch.Default>
</Switch>
```
