import BaseModal from '@/components/BaseModal.vue';
import Exclamation from '@/components/global/SvgIcons/Exclamation.vue';

export default {
  title: 'BaseModal',
};

export const DefaultModal = () => ({
  components: { BaseModal },
  template: `
    <BaseModal :show="true">
      <template #modal-headline>
        <strong>The Modal Headline</strong>
      </template>

      <template #modal-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </template>

      <template #modal-footer>
        <button class="button-green w-full inline-flex justify-center sm:ml-3 sm:w-auto sm:text-sm">Save</button>
        <button
          class="button-gray-outlined mt-3 w-full inline-flex justify-center sm:ml-3 sm:w-auto sm:text-sm sm:mt-0"
        >
          Cancel
        </button>
      </template>
    </BaseModal>
  `,
});

export const ModalWithIcon = () => ({
  components: {
    BaseModal,
    Exclamation,
  },
  template: `
    <BaseModal :show="true">
      <template #modal-headline>
        <strong>Delete Stuff</strong>
      </template>

      <template #icon>
        <div class="h-full w-full rounded-full bg-red-100 inline-flex items-center justify-center">
          <Exclamation class="h-6 w-6 text-red-600" />
        </div>
      </template>

      <template #modal-content>
        Are you sure, you want to delete the stuff?
        Everything will be gone!
      </template>

      <template #modal-footer>
        <button class="button-red w-full inline-flex justify-center sm:ml-3 sm:w-auto sm:text-sm">Delete</button>
        <button
          class="button-gray-outlined mt-3 w-full inline-flex justify-center sm:ml-3 sm:w-auto sm:text-sm sm:mt-0"
        >
          Cancel
        </button>
      </template>
    </BaseModal>
  `,
});
