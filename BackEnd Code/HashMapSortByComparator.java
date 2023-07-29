package javaPractice;

import java.util.Map.Entry;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import jakarta.persistence.Entity;

public class HashMapSortByComparator {

	public static void HashmapSortComp()
	{
		
		Map<Integer,String> hshmp=new HashMap<>();
		
		hshmp.put(7788,"Scotit");
		hshmp.put(7897,"King");
		hshmp.put(7963,"agilsfe");
		hshmp.put(7434,"harryaghsdcakk");
		
		System.out.println("Beforw Sorting....");
		
		hshmp.forEach((k,v)->System.out.println(k+" "+v));
		
		Set<Entry<Integer,String>>sortedset=hshmp.entrySet();
		
		List<Entry<Integer,String>>list=new ArrayList<>(sortedset);
		
		Collections.sort(list,new Comparator<Entry<Integer,String>>()
		{
			
			@Override
			public int compare(Entry<Integer,String> o1,Entry<Integer,String> o2)
			{
				//return o1.getKey().compareTo(o2.getKey());
				return o2.getValue().compareTo(o1.getValue());
			}
		});
		
		System.out.println("Sorting based on value: "+list);
		
	//	list.forEach(s->System.out.println(s.getKey()+" "+s.getValue()));
	}
	
	
		public static void main(String[] args) {
		
		
		 HashmapSortComp();
	}

}
