import { createContext, useContext, useState } from "react";

const CurrentProfileContext = createContext();
const SetCurrentProfileContext = createContext();

export const useCurrentProfile = () => useContext(CurrentProfileContext);
export const useSetCurrentProfile = () => useContext(SetCurrentProfileContext);

export const CurrentProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    currentProfile: { results: [] },
  });

  return (
    <CurrentProfileContext.Provider value={profileData}>
      <SetCurrentProfileContext.Provider value={setProfileData}>
        {children}
      </SetCurrentProfileContext.Provider>
    </CurrentProfileContext.Provider>
  );
};
