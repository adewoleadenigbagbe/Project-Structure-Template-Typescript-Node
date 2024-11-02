import { interfaces, Container as InversifyContainer} from "inversify";

import { App } from "@src/app";


class ContainerManager{
    private static instance : ContainerManager;
    private _container: InversifyContainer;
    private initialized: boolean = false;

    constructor(){
        this._container = new InversifyContainer({
            defaultScope: 'Singleton',
        });
    }

    public static getInstance():ContainerManager{
        if(!ContainerManager.instance){
            ContainerManager.instance = new ContainerManager();
        }

        return ContainerManager.instance;
    }

    public getContainer():InversifyContainer{
        if(!this.initialized){
            this.initialize();
        }

        return this._container;
    }

    public get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        if (!this.initialized) {
          this.initialize();
        }
        return this._container.get<T>(serviceIdentifier);
      }    

    private initialize() {
        if(this.initialized){
            return
        }

        //this._container.load(ControllersModule);
        this._container.bind<App>(App).toSelf();
        this.initialized = true;
    }

   
  public rebind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>,): interfaces.BindingToSyntax<T> {
    return this._container.bind<T>(serviceIdentifier);
  }

}

export const container = ContainerManager.getInstance();