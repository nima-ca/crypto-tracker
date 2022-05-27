import styles from "./ThemeToggleSwitch.module.css";

const ThemeToggleSwitch = () => {
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const storedTheme = localStorage.getItem("theme");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setDark();
  }

  const toggleTheme = (event) => {
    if (event.target.checked) {
      setDark();
    } else {
      setLight();
    }
  };

  return (
    <div className={styles["toggle-theme-wrapper"]}>
      <span>☀️</span>
      <label className={styles["toggle-theme"]} htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={toggleTheme}
          defaultChecked={defaultDark}
        />
        <div className={`${styles.slider} ${styles.round}`}></div>
      </label>
      <span>🌒</span>
    </div>
  );
};

export default ThemeToggleSwitch;
