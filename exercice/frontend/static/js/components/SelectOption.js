export default function selectOption(platform, index) {
  let newOption = document.createElement('div');
  newOption.innerHTML = `${platform.name}`
  newOption.className = `select-option`
  newOption.id = `${index}`
  return newOption
}