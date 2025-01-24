function createPubSub() {
  const events = {};

  function subscribe(eventName, callback) {
    if (!events[eventName]) {
      events[eventName] = [];
    }
    events[eventName].push(callback);
    console.log(`Subscribed to event: ${eventName}`,events);
  }

  function unsubscribe(eventName, callback) {
    if (!events[eventName]) return;

    events[eventName] = events[eventName].filter((cb) => cb !== callback);
    console.log(`Unsubscribed from event: ${eventName}`);
  }

  function publish(eventName, data) {
    console.log(`Publishing event: ${eventName} with data:`, data);
    if (!events[eventName]) {
      console.error(`No subscribers for event: ${eventName}`);
      return;
    }
    events[eventName].forEach((callback) => {
      callback(data);
    });
  }

  return {
    subscribe,
    unsubscribe,
    publish,
  };
}

export const pubSub = createPubSub();
