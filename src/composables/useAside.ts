export function useAside(): {
  isCollapse: Ref<boolean>;
  hidden: () => void;
} {
  const isCollapse = useState('isCollapse', () => false);

  function hidden(): void {
    isCollapse.value = !isCollapse.value;
  }

  return {
    isCollapse,
    hidden
  };
}
