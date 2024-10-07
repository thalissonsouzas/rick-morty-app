import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DebounceService {
  private readonly subject = new Subject<any>();

  constructor() { }

  debounce(func: (...args: any[]) => void, wait: number) {
    this.subject.pipe(debounceTime(wait)).subscribe(func);
  }

  trigger(value?: any) {
    this.subject.next(value);
  }
}
