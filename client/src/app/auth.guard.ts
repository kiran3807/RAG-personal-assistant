import { CanActivateFn, UrlTree, Router } from '@angular/router';
import {inject} from '@angular/core';

import { InternalStorageService, Details } from './internal-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const internalStorage = inject(InternalStorageService);
  const router = inject(Router);

  const addr = internalStorage.get(Details.ADDRESS);
  if(addr) {
    return true;    
  }else {
    return router.navigate(["/"]);
  }
};
