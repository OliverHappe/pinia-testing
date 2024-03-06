thoughts for marcus:


store.dispatch(logoutAction);

// store 1
useUserStore.clear();

// store 2
routerStore.goTo();

// store 3
localStorage.clear();

// indirectionality
// facade pattern


actionStream.handle(
  ofType(MyExpectedAction),
  do()
  emit(MyExpectedAction)
)


useDispatch(logout)

logout() {
  store.dispatch(logout) // data-auth
}

useAuthFacade().logout();

featureNotifier

dataNotifier

show()

hide() 




useBoardStoreFacade = () => {
  updateCard(payload: derAction): void {
    useBoardStore().dispatch(updateCardRequestAction(payload));
  }
}