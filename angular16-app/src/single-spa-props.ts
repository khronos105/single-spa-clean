/**
 * Single-SPA Props Interface
 * 
 * Defines the shape of props passed from root-config to this microfrontend
 */

export interface SingleSpaProps {
  name: string;
  singleSpa: any;
  mountParcel: (config: any, customProps: any) => any;
  
  // Custom props from root-config
  appName?: string;
  version?: string;
  
  // Any additional props
  [key: string]: any;
}
