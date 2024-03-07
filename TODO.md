# Next steps:

- [x] implement updateCard
- [x] extend locking mechanism to check against a user (we need a user store that holds our current user)
  - [x] implement isCardLocked selector
  - [x] implement faked UserStore
  - [x] refactor lockedCards to know the user that has the lock
  - [x] visualize card being locked for somebody else
  - [x] ensure to be able to edit a card that is locked for the current user
- [x] Factory for creating actions easily!
- [ ] ~~Effects against our api~~
- [x] decission: types will (for now) be manually duplicated between frontend- and backend-repo
- [x] extract socket into a separate module
- [x] split actions into request, success and failure
- [ ] moveCard - via DragAndDrop
- [ ] createCard
- [ ] deleteCard

