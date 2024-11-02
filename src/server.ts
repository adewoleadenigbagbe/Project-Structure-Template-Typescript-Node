import {container} from '@src/di/container'
import { App } from 'src/app';


const app = container.get(App);

app
.Initialize()
.then(() => app.Start())
.catch((err) => {
    console.error('Failed to start the application:', err);
})