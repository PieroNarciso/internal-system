import { GetterTree, Module, ActionTree, MutationTree } from 'vuex';
import { RootState } from '@/store';
import { User } from '@/types';

interface UserState {
  user: User,
}

const state: UserState = {
  user: {}
}

const getters: GetterTree<UserState, RootState> = {
  isAdmin: (state) => {
    if (state.user.role === 'admin')
      return true;
    else
      return false;
  },
  isLogin: (state) => {
    if (state.user.role) {
      return true;
    }
  },
  user: (state) => state.user,
}

const mutations: MutationTree<UserState> = {
}

const actions: ActionTree<UserState, RootState> = {
}


const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export { userModule };
