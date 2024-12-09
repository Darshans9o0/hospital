import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCACUAKADASIAAhEBAxEB/8QAGwABAQEBAQEBAQAAAAAAAAAAAAQDAgUBBgf/xAAtEAEAAgECBQIFBAMBAAAAAAAAAQIDETEEEiFBUSIyE1JhcYEFYoKxFCMzof/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/uIAAAAAAAAAAAAAAAAAAAAAAAAAAzyZa036z4T3z3ttOkfQFU2rG8xH5c/Gx/NCKes66kzEfQFvxsfzQ6i1Z2mJ/KCJjydddweiIsea9N51j6qceWt+kdJ8A0AAAAAAAAAAYZs3L6a9bf06zX5K9N52R/XeZA6956gKjPNkjHXXvO0I7WtedbTMu+ItzZZ8RsyB1W1qzrWdFmHL8Wvi0boWvD25cseJ6SC0100AFWDNzem+/afLd50dJWYMnPXr7o3RWoAAAAAAM89uXHMxuCXLfnvM9uzgFQAB59/fb7y5aZ68uSfE9YZgPtPfX7w+NOHpzZq/TqC4PuAO8V+S8T22lwA9CH1ngtzY4nvs0RQAAABhxU+iI8y3T8X7a/cEwCoAAyz4oyV/dGyO1bVnS1Zh6Lm16T0m1fzIIK1m06VjWVuHH8OvXrbu6i9O1q/iXQAAAAKuEn0THiW6fhPbb7qEUAAAAY8TGuP7S2c3jmrNfIIAmNJ0nsbdZ2VCZ0jWekR3TZOJ7Y4/Ms8+Wck6R7e0MgdWtNp1tMy5AB1W1qTrWZhyApx8T2vH5hTvGsbS81rgyzjnSetJ7eAWhvtOpEaz0BXwsf69fMtnNI5axHh0igAAAAAJeKppPNG07oeKvpWK+XrWrFomJ2l4/H47483qj0ztZUTAAAAAAAAr4W+tJr3j+l3DU1tzz22efwOK2TL015Y90+HsVrFYiI2hFdAAAAAAAAOMuOuWk1vGsS7AePxPBXw62rrannvCR+jTZuDw5us15bea9AeKL8n6beJ9GSJ+k9GU8BxHyRP8oBKKv8DiPliP5Q0x/pt5/wCl6xH7eoIVfC8FkzTFrxyU/wDZehh4PDh2rzT5t1UA4xY6YqRWldIh2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q=="
      },
      
      addres: {
        type: Object,
       default : {line1 : '' , line2:''}
      },
      gender : {
        type : String ,
        default : "NOT SELECTED"
      },
      dob : {
        type : String ,
        default : "NOT SELECTED"
      },
      phone : {
        type : String,
        default : '0000000000'
      }

     
      
    },
    { minimize: false }
  );
  const UserModel = mongoose.model.doctor || mongoose.model("user", userSchema);
  
  export default UserModel;
  