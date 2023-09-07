### Toast Component

The Toast component is a simple and customizable way to display temporary messages or notifications to users in your web application.
It provides a non-intrusive and user-friendly way to communicate information.

## Features

- **Customizable:** Easily style and customize the appearance of your toasts.
- **Positioning:** Choose where on the screen to display the toasts (top, bottom, top left, top right, bottom left, bottom right).
- **Timeout:** Set a timeout for auto-dismissal or allow users to manually close the toasts.
- **Stacking:** Display multiple toasts in a stack or queue.

```js
import { toast } from 'smart-components-dinkar';

export default function App(){

    return (
        <div>
            <button onClick={() => toast('Hi, this is some info')}>Info</button>
            <button onClick={() => toast.success('Created Successfully')}>Success</button>
            <button onClick={() => toast.error('Something went wrong')}>Error</button>
            <button onClick={() => toast.warn('Please fill form fields carefully', { closeAfter: 10 })}>Warning</button>
        </div>
    )
}
```
