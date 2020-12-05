import BaseInput from '@/components/BaseInput.vue';

export default {
  title: 'BaseInput',
  component: BaseInput,
};

export const TextInput = () => '<BaseInput id="text-input-1" type="text" />';

export const TextInputWithIcon = () => '<BaseInput id="text-input-2" type="text" icon="eye-on" />';

export const TextInputWithError = () => `
  <BaseInput id="text-input-3" type="text" value="Error Input" error="must be a nice value" />
`;

export const TextInputWithIconAndError = () => `
  <BaseInput id="text-input-4" type="text" icon="eye-off" error="must be a nice value" value="Error" />
`;

export const TextInputWithLabel = () => '<BaseInput id="text-input-5" type="text" label="Text" />';

export const DisabledTextInput = () => `
  <BaseInput id="text-input-6" type="text" label="Text" value="Disabled" disabled />
`;
