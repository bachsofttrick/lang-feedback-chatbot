<script>
  export let loading = false;
  export let examples = [];
  export let onSubmit;

  const LANGUAGES = [
    "English", "Spanish", "French", "German", "Italian",
    "Portuguese", "Japanese", "Chinese", "Korean",
  ];

  let sentence = "";
  let language = "English";

  function handleSubmit(e) {
    e.preventDefault();
    if (sentence.trim()) onSubmit(sentence.trim(), language);
  }

  function loadExample(example) {
    sentence = example.sentence;
    language = example.language;
  }
</script>

<div class="w-full max-w-2xl">
  <form on:submit={handleSubmit} class="flex flex-col gap-3">
    <textarea
      class="w-full border border-gray-300 rounded-xl p-4 text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
      rows="4"
      placeholder="Type a sentence you want feedback on..."
      bind:value={sentence}
      maxlength="1000"
    ></textarea>
    <div class="flex gap-3 items-center">
      <select
        class="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        bind:value={language}
      >
        {#each LANGUAGES as lang}
          <option value={lang}>{lang}</option>
        {/each}
      </select>
      <button
        type="submit"
        disabled={loading || !sentence.trim()}
        class="ml-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  </form>

  {#if examples.length > 0}
    <div class="mt-4">
      <p class="text-xs text-gray-400 mb-2 uppercase tracking-wide font-semibold">Try an example</p>
      <div class="flex flex-wrap gap-2">
        {#each examples as ex}
          <button
            on:click={() => loadExample(ex)}
            class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-colors text-left"
          >
            {ex.sentence.length > 50 ? ex.sentence.slice(0, 47) + "..." : ex.sentence}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
