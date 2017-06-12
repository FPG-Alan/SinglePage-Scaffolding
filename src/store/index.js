import { observable, action} from 'mobx';
import router from '../router';

class Store {
    @observable initScrollTop = false;
    @observable currentPage = null;




    @action changeCurrentPage = (cp) => {
        this.currentPage = cp;
        this.changeURL();
    }

    @action changeInitScrollTop = (flag) => {
        this.initScrollTop = flag;
    }

    changeURL = () => {
        console.log('1111111111111111111111');
        console.log(router.rootUrl);

        history.pushState({}, '', window.location.origin+router.rootUrl+'/'+this.currentPage.constructor.pageName+'/');
    }
}
const StoreInstance = new Store();
export default StoreInstance;
