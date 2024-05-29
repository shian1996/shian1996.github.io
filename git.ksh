#echo "Enter date: "
#read date
#echo "Enter git commit: "
#read gitcommit

  dtg=`date -d "0 days" +%Y%m%d`00
  yy=`echo ${dtg} | cut -c 1-4`
  mm=`echo ${dtg} | cut -c 5-6`
  dd=`echo ${dtg} | cut -c 7-8`
  date="${yy}-${mm}-${dd}"

cd /home/shian/web/shian1996.github.io
git add Prep/* SST/* MLD/* SBT/* index.html git.ksh git.ksh_2 check_ic.txt
git commit -m ${date}
git push
