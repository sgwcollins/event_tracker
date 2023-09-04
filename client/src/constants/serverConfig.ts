
interface serverConfigType  {
    [key: string]: {
        BASE_URL: string;
    }
}

export const  serverConfig:serverConfigType = {
    localhost: {
      BASE_URL: 'http://localhost:4000/',
    },
 
 
  };
  
