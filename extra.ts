import { v4 as uuidv4 } from "uuid";
interface Subscriber {
  notify(value: any): void;
  id: string;
}

abstract class Subject {
  private subscribers: Subscriber[] = [];

  // Add new subscriber
  public addSubcriber(s: Subscriber): void {
    console.log(`Adding subscriber: ${s.id}`);
    this.subscribers.push(s);
  }

  // Remove existing subscriber
  public removeSubscriber(s: Subscriber): void {
    const isExist = this.subscribers.findIndex(
      (element) => (element.id = s.id)
    );

    if (isExist !== -1) {
      console.log(`Removing subscriber:: ${s.id}`);
      this.subscribers.splice(isExist, 1);
    }
  }

  public notify(value: any): void {
    console.log("Notifying all the  subscribers");
    const tmpSubscribers = [...this.subscribers];
    tmpSubscribers.forEach((element) => {
      element.notify(value);
      this.removeSubscriber(element);
    });
  }
}

class ConcreteSubject extends Subject {
  private state: any;
  getState(): any {
    return this.state;
  }

  setState(state: any) {
    this.state = state;
  }
}

class ConcreteSubscriber implements Subscriber {
  id: string;
  private state: any;
  private subject: ConcreteSubject;
  private callback;

  constructor(subject: ConcreteSubject, callback: () => void) {
    this.id = uuidv4();
    this.subject = subject;
    this.callback = callback;
  }

  notify(message: string) {
    console.log(`${this.id} - Reciving notifycation`);
    this.state = this.subject.getState();
    this.callback();
  }

  getSubject() {
    return this.subject;
  }

  setSubject(subject: ConcreteSubject) {
    this.subject = subject;
  }
}

const refreshToken = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(`Token refreshed`));
    }, 1000);
  });

class RestClient {
  private subject = new ConcreteSubject();
  public queue = [];
  private isRefreshingToken = false;
  public get(value, time = 300) {
    if (!this.isRefreshingToken) {
      this.queue.push(1);
      return new Promise((resolve) => {
        setTimeout(() => {
          // Remove element from the queue
          this.queue.shift();
          resolve({ value, q: this.queue.length });

          if (!this.queue.length) {
            this.isRefreshingToken = true;
            refreshToken().then((response) => {
              this.isRefreshingToken = false;
              console.log("Pending::", this.queue.length);
              this.subject.notify(this.isRefreshingToken);
            });
          }
        }, time);
      });
    } else {
      // This happens when the token was refreshing
      return new Promise((innerResolver) => {
        const resolver = () => {
          console.log("Resolving pending promise");
          //this.subject.removeSubscriber(subscriber); // This fucking line >:
          innerResolver(this.get(value, time));
        };

        const subscriber = new ConcreteSubscriber(this.subject, resolver);
        this.subject.addSubcriber(subscriber);
      });
    }
  }
}

export const restClient = new RestClient();
