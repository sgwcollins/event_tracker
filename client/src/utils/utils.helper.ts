interface AnyObject {
    [key: string]: any;
}

export const flattenObj = (obj: AnyObject): AnyObject => {
    return Object.keys(obj).reduce((acc: AnyObject, cur: string) => {
        return typeof obj[cur] === 'object' && obj[cur] !== null 
            ? { ...acc, ...flattenObj(obj[cur]) }
            : { ...acc, [cur]: obj[cur] };
    }, {});
}


export function timeAgo(date: Date): string {
    const now = new Date().getTime();
    const diffInSeconds = Math.floor((now - date.getTime()) / 1000);
  
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;  // An approximation
  
    if (diffInSeconds < minute) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < hour) {
      return `${Math.floor(diffInSeconds / minute)} min ago`;
    } else if (diffInSeconds < day) {
      return `${Math.floor(diffInSeconds / hour)} hours ago`;
    } else if (diffInSeconds < week) {
      return `${Math.floor(diffInSeconds / day)} days ago`;
    } else if (diffInSeconds < month) {
      return `${Math.floor(diffInSeconds / week)} weeks ago`;
    } else {
      return `${Math.floor(diffInSeconds / month)} months ago`;
    }
  }
  

  
  
  
  