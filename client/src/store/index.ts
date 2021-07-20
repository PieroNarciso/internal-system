import { createStore } from 'vuex';
import { userModule } from '@/store/user';

export interface RootState {
}

const store = createStore<RootState>({
  modules: {
    userModule
  }
});

export { store };
