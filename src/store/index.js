import { observable, action } from 'mobx';

class Store {

    @observable currentPage = null;



    @action changeCurrentPage = (cp) => {
        this.currentPage = cp;
        this.changeURL();
    }

    changeURL = () => {
        history.pushState({}, '', window.location.origin+'/'+this.currentPage.constructor.pageName+'/');
    }
}
const StoreInstance = new Store();
export default StoreInstance;
