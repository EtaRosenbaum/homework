using System;

namespace UsingThreads {
  
    internal class Shirt {
        public string Color { get; set; }
        public string Pattern { get; set; }
        public Shirt() { }
        public Shirt(string color, string pattern) {
            Color = color;
            Pattern = pattern;
        }

        public override string? ToString() {
            return $"{Color}:{Pattern}";
        }
    }
    internal class HW49 {

        static void Main(string[] args)
        {
            Shirt[] shirts = new Shirt[16];
            string[] colors = { "red", "blue", "white", "green" };
            string[] patterns = { "striped", "checkered", "solid", "block" };
            int x = 0;
            
                for (int i = 0; i < colors.Length; i++) {
                    for (int j = 0; j < patterns.Length; j++) {
                        shirts[x] = new Shirt(colors[i], patterns[j]);
                        x++;
                    }
                }
            
            foreach (Shirt shirt in shirts) {
                Console.WriteLine(shirt);
            }
        }
    }
}
